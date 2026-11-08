import { Smartphone, Rocket, Globe, Radio, Gamepad2 } from "lucide-react";

// cfg.sel: [label, [[option, price?], ...]]  price = sum of picked option prices
// cfg.qty: [label, min, default, unit]       total = price * qty / unit
export const services = [
  { id: "numbers", title: "Virtual Numbers", short: "Numbers", desc: "Global OTP SMS numbers across 25+ countries", icon: Smartphone, status: "active",
    cfg: { sub: "Choose a country and the app that needs a code.", cta: "Get number",
      sel: [["Country", [["Nigeria", 350], ["Ghana", 450], ["United Kingdom", 1100], ["United States", 900], ["India", 300]]],
            ["App", [["WhatsApp"], ["Telegram"], ["Google"], ["Facebook"], ["Instagram"], ["TikTok"]]]] } },
  { id: "boosting", title: "Growth Boosting", short: "Boosting", desc: "Creator views, followers & business reach", icon: Rocket, status: "active",
    cfg: { sub: "Grow your page. Prices are per 1,000.", cta: "Place order",
      sel: [["Platform", [["Instagram"], ["TikTok"], ["YouTube"], ["X"]]], ["Type", [["Followers", 2500], ["Likes", 600], ["Views", 300]]]],
      inp: ["Link or username", "@yourpage"], qty: ["Quantity", 100, 1000, 1000] } },
  { id: "vpn", title: "VPN Access", short: "VPN", desc: "Encrypted ultra-fast global VPN servers", icon: Globe, status: "active",
    cfg: { sub: "Encrypted servers in 40+ locations.", cta: "Buy plan",
      sel: [["Plan", [["1 week", 1500], ["1 month", 4000], ["3 months", 10000]]], ["Devices", [["1 device", 0], ["3 devices", 1000]]]] } },
  { id: "proxies", title: "Proxies", short: "Proxies", desc: "Residential, ISP, mobile & datacenter IPs", icon: Radio, status: "active",
    cfg: { sub: "Prices are per GB.", cta: "Buy proxies",
      sel: [["Type", [["Residential", 3500], ["ISP", 2500], ["Mobile", 5000], ["Datacenter", 1200]]], ["Location", [["Nigeria"], ["United States"], ["United Kingdom"]]]],
      qty: ["Bandwidth (GB)", 1, 5, 1] } },
  { id: "gaming", title: "Gaming & Top-ups", short: "Gaming", desc: "Steam, PlayStation, Xbox, PUBG & Roblox", icon: Gamepad2, status: "active",
    cfg: { sub: "Enter the account that should receive the top-up.", cta: "Buy top-up",
      sel: [["Platform", [["Steam"], ["PlayStation"], ["Xbox"], ["PUBG UC"], ["Roblox Robux"]]], ["Amount", [["₦5,000", 5000], ["₦10,000", 10000], ["₦20,000", 20000]]]],
      inp: ["Player ID or account email", "e.g. player123"] } },
];

export const featured = [
  { id: 1, label: "Virtual Numbers", title: "Receive SMS codes in 25+ countries", cta: "Get a number", svc: 0 },
  { id: 2, label: "VPN Access", title: "Fast, encrypted servers worldwide", cta: "See plans", svc: 2 },
  { id: 3, label: "Growth Boosting", title: "Grow your page with real reach", cta: "Start boosting", svc: 1 },
];
