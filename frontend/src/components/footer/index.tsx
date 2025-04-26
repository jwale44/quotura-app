import Link from "next/link"
import { DefaultWidth } from "../default-width"
import { QuotoraLogo } from "../ui/quotora-logo"

export const Footer = () => {
  return (
    <section className="py-20">
      <DefaultWidth className="px-6 sm:px-10 pt-14 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-12">
          {/* Logo */}
          <div>
            <QuotoraLogo width={150} height={150} />
          </div>

          {/* Terms */}
          <div>
            <p className="font-sans">
              <b>Legal</b>
            </p>

            <ul className="mt-3 flex flex-col gap-1">
              <li>
                <Link href={"#"}>
                  <span className="font-sans hover:font-medium duration-200 text-sm">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <span className="font-sans hover:font-medium duration-200 text-sm">
                    Terms
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </DefaultWidth>
    </section>
  )
}
