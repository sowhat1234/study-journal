"use client"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginButton() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Learning Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => signIn("google")} className="w-full">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
