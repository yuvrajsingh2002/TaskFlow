function DashboardCard({ title, value, color }) {
  return (
    <div className={`rounded-xl p-6 text-white shadow-lg ${color}`}>

      <h3 className="text-lg">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>

    </div>
  );
}

export default DashboardCard;