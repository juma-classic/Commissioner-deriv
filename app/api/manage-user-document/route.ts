import { NextRequest, NextResponse } from 'next/server'

// Mock API endpoint similar to the original
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, documentId, sites } = body

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Mock response similar to original
    const response = {
      message: "Document updated successfully",
      documentId: documentId || "VRTC7528369",
      changes: {
        sitesAdded: sites?.added || [],
        sitesRemoved: sites?.removed || [],
        totalSites: 4
      },
      document: {
        token: "a1-AtLIsGBTSlddC270Hazg1Pdcq8IK5",
        sites: [
          "https://www.dexterator.com",
          "https://mastertrader.com/verify",
          "https://tradersden.site/",
          "https://autotrades.site/"
        ],
        $sequence: 439,
        $id: documentId || "VRTC7528369",
        $createdAt: "2025-07-09T15:57:15.504+00:00",
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $databaseId: "67ece9df003de31e9a9d",
        $collectionId: "68696a16002a69439d18"
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return current document status
  const response = {
    documentId: "VRTC7528369",
    sites: [
      "https://www.dexterator.com",
      "https://mastertrader.com/verify", 
      "https://tradersden.site/",
      "https://autotrades.site/"
    ],
    status: "active",
    lastUpdated: new Date().toISOString()
  }

  return NextResponse.json(response)
}