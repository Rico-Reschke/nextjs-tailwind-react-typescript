interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  console.log("HomeLayout");

  return <>{children}</>;
}
