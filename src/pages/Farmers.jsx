import { IndianRupee, MessageSquare, Plus } from 'lucide-react'
import { Badge, Card, DataTable, PageHeader, Person, StatCard, inr } from '../components/ui'
import { useContact } from '../components/ContactModal'
import { farmers } from '../data'

const tone = { Paid: 'green', Pending: 'amber', Advance: 'violet' }

export default function Farmers() {
  const { openContact } = useContact()
  const pending = farmers.filter((f) => f.status === 'Pending').reduce((s, f) => s + f.due, 0)
  return (
    <>
      <PageHeader
        title="Farmers & payments"
        subtitle="10-day payment cycle · Bank / UPI transfer"
        actions={<>
          <button onClick={() => openContact('Add Farmer')} className="btn-ghost"><Plus className="h-4 w-4" /> Add farmer</button>
          <button onClick={() => openContact('Bulk Farmer Payments')} className="btn-primary"><IndianRupee className="h-4 w-4" /> Pay all pending</button>
        </>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending payout" value={inr(pending)} icon={IndianRupee} tone="amber" />
        <StatCard label="Paid this cycle" value="₹8.94L" icon={IndianRupee} tone="emerald" />
        <StatCard label="Advances outstanding" value="₹1.12L" icon={IndianRupee} tone="violet" />
      </div>
      <Card className="mt-6" bodyClass="" title="Farmer ledger" subtitle="Current cycle: 11 – 20 Nov">
        <DataTable
          rows={farmers}
          columns={[
            { key: 'name', label: 'Farmer', render: (r) => <Person name={r.name} sub={`${r.code} · ${r.village}`} /> },
            { key: 'type', label: 'Milk', render: (r) => <Badge tone={r.type === 'Cow' ? 'blue' : 'violet'}>{r.type}</Badge> },
            { key: 'litres', label: 'Litres', render: (r) => <span className="font-semibold">{r.litres} L</span> },
            { key: 'avgFat', label: 'Avg fat', render: (r) => `${r.avgFat}%` },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={tone[r.status]}>{r.status}</Badge> },
            { key: 'due', label: 'Amount', align: 'right', render: (r) => <span className="font-semibold text-slate-800">{inr(r.due)}</span> },
            { key: 'm', label: '', align: 'right', render: () => <button onClick={() => openContact('SMS / WhatsApp Passbook')} className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"><MessageSquare className="h-4 w-4" /></button> },
          ]}
        />
      </Card>
    </>
  )
}
