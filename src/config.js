import {
  BarChart3, Beaker, Droplets, IndianRupee, LayoutDashboard, Milk, Printer, Settings, Store, Truck, Users, Warehouse,
} from 'lucide-react'

export const app = {
  name: 'DairyMitra',
  tagline: 'Dairy & Milk Collection',
  logo: Milk,
  user: { name: 'Suresh Yadav', role: 'Collection Centre · Anand' },
  searchPlaceholder: 'Search farmer code, name, village…',
}

// Items with `to` are implemented in this demo; others are locked (full version).
export const nav = [
  {
    title: 'Collection',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard },
      { label: 'Milk Collection', to: '/collection', icon: Droplets },
      { label: 'Farmers & Payments', to: '/farmers', icon: Users },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Fat / SNF Rate Chart', icon: Beaker },
      { label: 'Farmer Payments & Advances', icon: IndianRupee },
      { label: 'Milk Sales & Dispatch', icon: Truck },
      { label: 'Cattle Feed Inventory', icon: Warehouse },
      { label: 'Collection Centres', icon: Store },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Analyzer & Scale Setup', icon: Printer },
      { label: 'Reports', icon: BarChart3 },
      { label: 'Settings', icon: Settings },
    ],
  },
]
