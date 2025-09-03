import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center">
      <p className="text-5xl">404</p>
      <p className="text-xl">Not Found</p>
      <Link href={"/"}>BACK</Link>
    </div>
  );
}
