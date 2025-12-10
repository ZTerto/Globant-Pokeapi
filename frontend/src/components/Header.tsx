export default function Header() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-gray-800 text-white shadow-md py-2 px-4 flex flex-col items-center">
      <span className="font-semibold text-lg">PokéFusion</span>

      {isLoggedIn ? (
        <div className="flex gap-4 items-center mt-1 text-sm">
          <span>👤 Usuario: {email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <span className="text-sm mt-1">🔒 Requiere registro</span>
      )}
    </div>
  );
}
