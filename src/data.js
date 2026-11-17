// Sample data for the UI demo. The complete project uses live APIs + database.

// Two-axis pricing: ₹ per litre = fat% × fatRate + SNF% × snfRate
export const rateCard = {
  Cow: { fatRate: 6.5, snfRate: 4.2 },
  Buffalo: { fatRate: 7.2, snfRate: 4.0 },
}
export const milkRate = (type, fat, snf) => +(fat * rateCard[type].fatRate + snf * rateCard[type].snfRate).toFixed(2)

export const farmers = [
  { code: 'F-101', name: 'Ramesh Patel', village: 'Vallabh Vidyanagar', type: 'Buffalo', litres: 412, avgFat: 6.8, due: 32840, status: 'Paid' },
  { code: 'F-102', name: 'Geeta Ben Solanki', village: 'Karamsad', type: 'Cow', litres: 286, avgFat: 4.1, due: 17460, status: 'Pending' },
  { code: 'F-103', name: 'Jayesh Chauhan', village: 'Bakrol', type: 'Buffalo', litres: 355, avgFat: 7.0, due: 29120, status: 'Pending' },
  { code: 'F-104', name: 'Manju Devi', village: 'Mogri', type: 'Cow', litres: 198, avgFat: 3.9, due: 11870, status: 'Paid' },
  { code: 'F-105', name: 'Kantibhai Parmar', village: 'Jitodia', type: 'Buffalo', litres: 524, avgFat: 6.6, due: 41230, status: 'Advance' },
  { code: 'F-106', name: 'Hetal Desai', village: 'Lambhvel', type: 'Cow', litres: 240, avgFat: 4.3, due: 14980, status: 'Pending' },
]

export const todayEntries = [
  { id: 1, code: 'F-105', name: 'Kantibhai Parmar', shift: 'Morning', type: 'Buffalo', qty: 18.4, fat: 6.7, snf: 9.1, time: '06:12' },
  { id: 2, code: 'F-101', name: 'Ramesh Patel', shift: 'Morning', type: 'Buffalo', qty: 14.2, fat: 6.9, snf: 9.0, time: '06:18' },
  { id: 3, code: 'F-102', name: 'Geeta Ben Solanki', shift: 'Morning', type: 'Cow', qty: 9.6, fat: 4.2, snf: 8.6, time: '06:25' },
  { id: 4, code: 'F-104', name: 'Manju Devi', shift: 'Morning', type: 'Cow', qty: 7.1, fat: 3.8, snf: 8.4, time: '06:31' },
]

export const collection30 = Array.from({ length: 14 }, (_, i) => ({
  label: `${4 + i} Nov`,
  cow: Math.round(1450 + Math.sin(i / 2) * 120 + i * 8),
  buffalo: Math.round(2100 + Math.cos(i / 3) * 160 + i * 11),
}))

export const quality = [
  { name: 'Grade A (fat ≥ 6)', value: 46 }, { name: 'Grade B', value: 38 }, { name: 'Grade C', value: 13 }, { name: 'Rejected', value: 3 },
]
