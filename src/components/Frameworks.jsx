import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "javascript",
    "css3",
    "html5",
    "microsoftoffice",
    "azure",
    "microsoft",
    "aws",
    "github",
    "figma",
    "git",
    "mysql",
    "react",
    "vitejs",
    "express",
    "nodejs",
    "laravel",
    "sqlite",
    "tailwindcss",
    "bootstrap",
    "python",
    "php",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon
            key={index}
            src={`assets/logos/${skill}.svg`}
            alt={`${skill}`}
          />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon
            key={index}
            src={`assets/logos/${skill}.svg`}
            alt={`${skill}`}
          />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, alt }) => (
  <img
    src={src}
    className="duration-200 rounded-sm hover:scale-110"
    alt={alt}
  />
);
