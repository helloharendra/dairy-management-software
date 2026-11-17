import { useState } from 'react'
import { CheckCircle2, Moon, Printer, Sun } from 'lucide-react'
import { Badge, Card, DataTable, PageHeader, Segmented, inr } from '../components/ui'
import { useContact } from '../components/ContactModal'
import { farmers, milkRate, rateCard, todayEntries } from '../data'

export default function Collection() {
  const { openContact } = useContact()
  const [entries, setEntries] = useState(todayEntries)
  const [shift, setShift] = useState('Morning')
  const [form, setForm] = useState({ code: 'F-103', type: 'Buffalo', qty: 12.5, fat: 6.8, snf: 9.0 })
  const [ok, setOk] = useState(false)

  const farmer = farmers.find((f) => f.code === form.code)
  const rate = milkRate(form.type, +form.fat, +form.snf)
  const amount = rate * +form.qty
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const save = (e) => {
    e.preventDefault()
    setEntries((es) => [{ id: Date.now(), ...form, name: farmer.name, shift, qty: +form.qty, fat: +form.fat, snf: +form.snf, time: new Date().toTimeString().slice(0, 5) }, ...es])
    setOk(true)
    setTimeout(() => setOk(false), 1400)
  }

  const totalL = entries.reduce((s, e) => s + e.qty, 0)
  const totalAmt = entries.reduce((s, e) => s + e.qty * milkRate(e.type, e.fat, e.snf), 0)

  return (
    <>
      <PageHeader
        title="Milk collection"
        subtitle="Rate is calculated automatically from fat and SNF readings."
        actions={<Segmented options={['Morning', 'Evening']} value={shift} onChange={setShift} />}
      />
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card title={<span className="flex items-center gap-2">{shift === 'Morning' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-sky-500" />} New entry · {shift}</span>} className="h-fit">
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="label">Farmer</label>
              <select value={form.code} onChange={(e) => { const f = farmers.find((x) => x.code === e.target.value); setForm({ ...form, code: f.code, type: f.type }) }} className="input">
                {farmers.map((f) => <option key={f.code} value={f.code}>{f.code} · {f.name}</option>)}
              </select>
              <p className="mt-1.5 text-xs text-slate-400">{farmer.village}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(rateCard).map((t) => (
                <button type="button" key={t} onClick={() => setForm({ ...form, type: t })} className={`rounded-xl py-2.5 text-sm font-semibold transition ${form.type === t ? 'bg-brand-50 text-brand-700 ring-2 ring-brand-500' : 'text-slate-500 ring-1 ring-slate-200'}`}>
                  {t === 'Cow' ? '🐄' : '🐃'} {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="label">Qty (L)</label><input type="number" step="0.1" value={form.qty} onChange={set('qty')} className="input" /></div>
              <div><label className="label">Fat %</label><input type="number" step="0.1" value={form.fat} onChange={set('fat')} className="input" /></div>
              <div><label className="label">SNF %</label><input type="number" step="0.1" value={form.snf} onChange={set('snf')} className="input" /></div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-500/30 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-400">Rate / litre</p><p className="text-2xl font-bold">{inr(rate.toFixed(2))}</p></div>
                <div className="text-right"><p className="text-xs text-slate-400">Amount</p><p className="text-2xl font-bold text-brand-300">{inr(amount.toFixed(2))}</p></div>
              </div>
              <p className="relative mt-3 text-[11px] text-slate-400">= {form.fat} × ₹{rateCard[form.type].fatRate} (fat) + {form.snf} × ₹{rateCard[form.type].snfRate} (SNF)</p>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2">
              <button type="button" onClick={() => openContact('Slip Printing & SMS to Farmer')} className="btn-ghost px-3"><Printer className="h-4 w-4" /></button>
              <button className="btn-primary py-3">{ok ? <><CheckCircle2 className="h-4 w-4" /> Saved</> : 'Save entry'}</button>
            </div>
          </form>
        </Card>

        <Card title="Today's entries" subtitle={`${entries.length} farmers · ${totalL.toFixed(1)} L · ${inr(totalAmt.toFixed(0))}`} bodyClass=""
          action={<button onClick={() => openContact('Milk Analyzer & Weighing Scale Integration')} className="text-sm font-semibold text-brand-600">Connect analyzer</button>}>
          <DataTable
            rows={entries}
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'name', label: 'Farmer', render: (r) => <div><p className="font-semibold text-slate-800">{r.name}</p><p className="text-xs text-slate-400">{r.code}</p></div> },
              { key: 'type', label: 'Milk', render: (r) => <Badge tone={r.type === 'Cow' ? 'blue' : 'violet'}>{r.type}</Badge> },
              { key: 'qty', label: 'Qty', render: (r) => `${r.qty} L` },
              { key: 'fat', label: 'Fat / SNF', render: (r) => `${r.fat} / ${r.snf}` },
              { key: 'amt', label: 'Amount', align: 'right', render: (r) => <span className="font-semibold text-slate-800">{inr((r.qty * milkRate(r.type, r.fat, r.snf)).toFixed(2))}</span> },
            ]}
          />
        </Card>
      </div>
    </>
  )
}
