/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EYwuRRSiQfA
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Card className="mx-auto max-w-md mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Contact Us</CardTitle>
        <CardDescription>
          Please fill out the form below and well get back to you shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="min-h-[100px]"
              id="message"
              placeholder="Your message..."
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
