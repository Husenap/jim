import SignInButton from "@/components/auth/sign-in-button";

export default function Header() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(hero.webp)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Jim!</h1>
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
