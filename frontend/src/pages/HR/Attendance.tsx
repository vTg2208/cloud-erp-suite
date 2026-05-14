export default function HRAttendance() {
  const attendance = [
    { id: 'AT-001', employee: 'John Doe', date: '2026-05-06', checkIn: '09:00', checkOut: '17:30', hours: 8.5 },
    { id: 'AT-002', employee: 'Jane Smith', date: '2026-05-06', checkIn: '08:45', checkOut: '17:00', hours: 8.25 },
    { id: 'AT-003', employee: 'Mike Johnson', date: '2026-05-06', checkIn: '09:15', checkOut: '18:00', hours: 8.75 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <button className="btn-primary">Export Report</button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Employee</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Check In</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Check Out</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{a.employee}</td>
                <td className="py-3 px-4 text-sm">{a.date}</td>
                <td className="py-3 px-4 text-sm">{a.checkIn}</td>
                <td className="py-3 px-4 text-sm">{a.checkOut}</td>
                <td className="py-3 px-4 text-sm text-right">{a.hours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
