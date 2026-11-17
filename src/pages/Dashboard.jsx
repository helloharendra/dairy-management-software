import { Link } from 'react-router-dom'
import { Beaker, Droplets, IndianRupee, Sun, Moon, Users } from 'lucide-react'
import { Card, Hero, HeroStat, StatCard } from '../components/ui'
import { BarsChart, DonutChart } from '../components/Charts'
import { collection30, quality } from '../data'

export default function Dashboard() {
  return (
    <>
      <Hero
        eyebrow="Anand collection centre"
        title="3,912 litres collected today 🥛"
        subtitle="Morning shift closed at 7:45 AM. Evening shift opens at 5:30 PM."
        side={
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-inset ring-white/20"><Sun className="h-5 w-5 text-amber-200" /><p className="mt-2 text-xs text-white/70">Morning</p><p className="text-2xl font-bold">2,284 L</p></div>
            <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-inset ring-white/20"><Moon className="h-5 w-5 text-sky-200" /><p className="mt-2 text-xs text-white/70">Evening (est.)</p><p className="text-2xl font-bold">1,628 L</p></div>
          </div>
        }
      >
        <Link to="/collection" className="btn bg-white text-brand-700 hover:bg-brand-50"><Droplets className="h-4 w-4" /> Start collection</Link>
      </Hero>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Milk this month" value="58,420 L" delta="6.2%" icon={Droplets} />
        <StatCard label="Avg. fat" value="5.8%" delta="0.2%" icon={Beaker} tone="amber" hint="SNF avg 8.8%" />
        <StatCard label="Farmer payable" value="₹21.6L" icon={IndianRupee} tone="emerald" hint="Next cycle: 20 Nov" />
        <StatCard label="Active farmers" value="342" delta="12" icon={Users} tone="violet" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Daily collection" subtitle="Litres · Cow vs Buffalo" className="xl:col-span-2">
          <BarsChart data={collection30} stacked series={[{ key: 'buffalo', name: 'Buffalo' }, { key: 'cow', name: 'Cow' }]} />
        </Card>
        <Card title="Milk quality grades"><DonutChart data={quality} centerValue="97%" centerLabel="Accepted" /></Card>
      </div>
    </>
  )
}
