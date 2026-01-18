'use client'

import { useState, useEffect, useCallback } from 'react'
import { DerivAPI, CommissionData, DerivConfig } from '@/lib/deriv-api'

export function useDerivAPI() {
  const [api, setApi] = useState<DerivAPI | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [commissionData, setCommissionData] = useState<CommissionData | null>(null)

  // Initialize API with config
  const initializeAPI = useCallback(async (config: DerivConfig) => {
    try {
      setIsLoading(true)
      setError(null)

      // Disconnect existing connection
      if (api) {
        api.disconnect()
      }

      const newApi = new DerivAPI(config)
      await newApi.connect()
      await newApi.authorize()

      setApi(newApi)
      setIsConnected(true)
      
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Deriv API'
      setError(errorMessage)
      setIsConnected(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [api])

  // Test connection without saving
  const testConnection = useCallback(async (config: DerivConfig) => {
    try {
      const testApi = new DerivAPI(config)
      await testApi.connect()
      await testApi.authorize()
      testApi.disconnect()
      return true
    } catch (err) {
      console.error('Connection test failed:', err)
      return false
    }
  }, [])

  // Fetch commission data
  const fetchCommissionData = useCallback(async () => {
    if (!api || !isConnected) {
      throw new Error('API not connected')
    }

    try {
      setIsLoading(true)
      setError(null)

      const data = await api.getCommissionData()
      
      // Also fetch historical data for charts
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const chartData = await api.getProfitTable(
        thirtyDaysAgo.toISOString().split('T')[0],
        new Date().toISOString().split('T')[0]
      )

      const enrichedData = {
        ...data,
        chartData: chartData.length > 0 ? chartData : data.chartData
      }

      setCommissionData(enrichedData)
      return enrichedData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch commission data'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [api, isConnected])

  // Auto-connect if config exists
  useEffect(() => {
    const savedConfig = localStorage.getItem('deriv-config')
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig)
        if (config.apiToken && config.appId) {
          initializeAPI(config)
        }
      } catch (err) {
        console.error('Failed to load saved config:', err)
      }
    }
  }, [initializeAPI])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (api) {
        api.disconnect()
      }
    }
  }, [api])

  return {
    api,
    isConnected,
    isLoading,
    error,
    commissionData,
    initializeAPI,
    testConnection,
    fetchCommissionData,
    disconnect: () => {
      if (api) {
        api.disconnect()
        setApi(null)
        setIsConnected(false)
      }
    }
  }
}