import Link from "next/link";

export default function DashboardNavLink({ navLink }) {
  const { name, icon, href, extraClass } = navLink;
  const Icon = icon;
  const iconExtraClass = navLink?.iconExtraClass;
  return (
    <Link
      href={href}
      className={`
        flex gap-2 items-center w-full py-2 px-4  bg-custom-primary/5 rounded-lg text-custom-primary/80 font-medium group hover:text-custom-primary hover:bg-custom-primary/10 transition-all duration-200
        ${extraClass ? extraClass : ""}
      `}
    >
      {icon && (
        <Icon
          className={`text-custom-primary/80 w-6 h-6 group-hover:text-custom-primary transition-all duration-200
        ${iconExtraClass ? iconExtraClass : ""}`}
        />
      )}

      {name}
    </Link>
  );
}
