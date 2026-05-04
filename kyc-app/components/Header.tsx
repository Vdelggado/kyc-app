"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
  };

  if (isPending) {
    return (
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-gray-900">Edupan KYC</div>
          <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-600">
          Edupan KYC
        </Link>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-sm font-medium text-gray-600">
                {session.user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}