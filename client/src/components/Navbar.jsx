function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="h-20 bg-white shadow flex items-center justify-between px-8">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        TaskFlow
      </h1>

      {/* Username - right side */}
      <div className="font-semibold text-gray-700">
        {user?.name}
      </div>

    </nav>
  );
}

export default Navbar;