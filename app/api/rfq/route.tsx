import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Here you would typically:
    // 1. Validate the data
    // 2. Save to database
    // 3. Send email notifications
    // 4. Integrate with CRM

    // For now, we'll just log the data and return success
    console.log("RFQ Submission:", {
      company: data.companyName,
      contact: data.contactName,
      email: data.email,
      items: data.items.length,
      timestamp: data.timestamp,
    })

    // Simulate email sending
    const emailData = {
      to: data.email,
      cc: "ashar@fainternational.com",
      subject: `RFQ Confirmation - ${data.companyName}`,
      html: generateRFQEmail(data),
    }

    // In a real implementation, you would send the email here
    // await sendEmail(emailData)

    return NextResponse.json({
      success: true,
      message: "RFQ submitted successfully",
      rfqId: `RFQ-${Date.now()}`,
    })
  } catch (error) {
    console.error("RFQ submission error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit RFQ" }, { status: 500 })
  }
}

function generateRFQEmail(data: any) {
  return `
    <h2>RFQ Confirmation - ${data.companyName}</h2>
    <p>Dear ${data.contactName},</p>
    <p>Thank you for your Request for Quote. We have received your inquiry and will respond within 24 hours.</p>
    
    <h3>Your Request Details:</h3>
    <ul>
      <li><strong>Company:</strong> ${data.companyName}</li>
      <li><strong>Contact:</strong> ${data.contactName}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Country:</strong> ${data.country}</li>
      <li><strong>Timeline:</strong> ${data.timeline}</li>
    </ul>

    <h3>Products Requested:</h3>
    <ul>
      ${data.items
        .map(
          (item: any) => `
        <li>Product: ${item.productSlug} - Quantity: ${item.quantity}${item.color ? ` - Color: ${item.color}` : ""}${item.customization ? ` - Notes: ${item.customization}` : ""}</li>
      `,
        )
        .join("")}
    </ul>

    ${data.additionalNotes ? `<h3>Additional Notes:</h3><p>${data.additionalNotes}</p>` : ""}

    <p>Best regards,<br>F&A International Sales Team</p>
  `
}
