import { TFunction } from 'next-i18next';
import Link from 'next/link';


type route = ({
    name: string | undefined
    path: string
})

const Breadcrumb = ({ t, routes }: {t: TFunction, routes: route[]}) => {

  return (
    <nav>
      <ul className="flex items-center space-x-2 text-gray-500">
        {routes.map((route, index) => (
          <li key={index} className="flex items-center">
            <Link href={"/" + route.path}>
              <h4 className="hover:text-gray-700">{route.name}</h4>
            </Link>
            {index < routes.length - 1 && (
              <span className="text-gray-400 mx-1 pointer-events-none">/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;