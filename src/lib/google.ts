import { google } from "googleapis"
import { prisma } from "@/lib/prisma"

export async function getGoogleAuth(userId: string) {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: "google",
    },
  })

  if (!account || !account.access_token) {
    throw new Error("No Google account found")
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : undefined,
  })

  // Handle token refresh
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
        await prisma.account.update({
            where: {
                provider_providerAccountId: {
                    provider: "google",
                    providerAccountId: account.providerAccountId
                }
            },
            data: {
                access_token: tokens.access_token,
                expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : undefined,
                refresh_token: tokens.refresh_token ?? account.refresh_token 
            }
        })
    }
  })

  return oauth2Client
}
