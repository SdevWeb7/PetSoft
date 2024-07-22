"use server";

import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export async function createCheckoutSession() {
    const session = await auth();
    if (!session) redirect('/login');

   const checkoutSession = await stripe.checkout.sessions.create({
       customer_email: session.user.email,
       line_items: [
              {
                price: "price_1Pf5y4GYAchVW4Yp3fkm7ZbW",
                quantity: 1,
              },
       ],
       mode: "payment",
       success_url: process.env.CANONICAL_URL+"/payment/?success=true",
       cancel_url: process.env.CANONICAL_URL+"/payment/?cancelled=true",
   })

    redirect(checkoutSession.url);
}
