import { TrendingUp, MessageCircle, Cpu, Gift, ShieldCheck } from "lucide-react";

// cfg.sel: [label, [[option, price?], ...]]  price = sum of picked option prices
// cfg.qty: [label, min, default, unit]       total = price * qty / unit
// cfg.num: true  -> after paying, show a number and wait for an SMS code (cfg.prefix is the dial code)
// Prices are sample values. Replace with your provider costs plus margin.
export const services = [
  { id: "boost", title: "Boost Social Media", short: "Boost", desc: "Followers, likes and views for Instagram, TikTok, YouTube & X", icon: TrendingUp, status: "active",
    cfg: { sub: "Grow your page. Prices are per 1,000.", cta: "Place order",
      sel: [["Platform", [["Instagram"], ["TikTok"], ["YouTube"], ["X"]]], ["Type", [["Followers", 2500], ["Likes", 600], ["Views", 300]]]],
      inp: ["Link or username", "@yourpage"], qty: ["Quantity", 100, 1000, 1000] } },
  { id: "whatsapp", title: "Buy US WhatsApp Numbers", short: "WhatsApp", desc: "Get a US (+1) number and receive your WhatsApp code", icon: MessageCircle, status: "active",
    cfg: { sub: "A US (+1) number for WhatsApp verification.", cta: "Get US number", num: true, prefix: "+1",
      sel: [["Number type", [["One-time code", 900], ["30-day rental", 4500]]]] } },
  { id: "esim", title: "Get eSIMs", short: "eSIMs", desc: "Travel data plans on your phone, no physical SIM", icon: Cpu, status: "active",
    cfg: { sub: "Pick a destination and data plan. Your eSIM QR code is sent by email.", cta: "Get eSIM",
      sel: [["Destination", [["United States", 3000], ["United Kingdom", 3200], ["Europe", 3500], ["Turkey", 2800], ["UAE", 3000]]],
            ["Data plan", [["1 GB · 7 days", 0], ["3 GB · 15 days", 2500], ["5 GB · 30 days", 5000]]]],
      inp: ["Email for your eSIM QR code", "you@example.com"] } },
  { id: "gifting", title: "Gifting", short: "Gifting", desc: "Send gift cards to friends and family instantly", icon: Gift, status: "active",
    cfg: { sub: "Choose a gift card and who should receive it.", cta: "Send gift",
      sel: [["Brand", [["Amazon"], ["Apple"], ["Google Play"], ["Steam"], ["Netflix"], ["Spotify"]]],
            ["Amount", [["$10 card", 16500], ["$25 card", 41000], ["$50 card", 82000]]]],
      inp: ["Recipient email", "friend@example.com"] } },
  { id: "vpn", title: "VPN", short: "VPN", desc: "Encrypted ultra-fast VPN servers worldwide", icon: ShieldCheck, status: "active",
    cfg: { sub: "Encrypted servers in 40+ locations.", cta: "Buy plan",
      sel: [["Plan", [["1 week", 1500], ["1 month", 4000], ["3 months", 10000]]], ["Devices", [["1 device", 0], ["3 devices", 1000]]]] } },
];

export const featured = [
  { id: 1, label: "US WhatsApp Numbers", title: "Verify WhatsApp with a US number", cta: "Get a number", svc: 1 },
  { id: 2, label: "eSIMs", title: "Travel data without a physical SIM", cta: "Get an eSIM", svc: 2 },
  { id: 3, label: "Boost Social Media", title: "Grow your page with real reach", cta: "Start boosting", svc: 0 },
  { id: 4, label: "Gifting", title: "Send gift cards in seconds", cta: "Send a gift", svc: 3 },
];
