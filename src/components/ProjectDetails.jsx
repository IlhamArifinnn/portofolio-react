import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm px-4">
      <motion.div
        className="relative flex flex-col md:flex-row w-full max-w-6xl bg-gradient-to-l from-midnight to-navy border border-white/10 rounded-2xl overflow-hidden p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Tombol close */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-md z-10"
        >
          <img src="assets/close.svg" className="w-5 h-5" />
        </button>

        {/* Gambar */}
        <div className="md:w-1/2 w-full max-h-[400px] md:max-h-full">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        {/* Konten */}
        <div className="md:w-1/2 w-full p-6 overflow-y-auto max-h-[85vh] text-white">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="mb-4 text-neutral-300">{description}</p>

          {subDescription?.map((sub, index) => (
            <p
              key={index}
              className="mb-2 text-sm text-neutral-400 leading-relaxed"
            >
              - {sub}
            </p>
          ))}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <img
                key={tag.id}
                src={tag.path}
                alt={tag.name}
                title={tag.name}
                className="w-9 h-9 rounded bg-white p-1"
              />
            ))}
          </div>

          {/* View Project button */}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold mt-5 text-white hover:underline"
            >
              View Project
              <img src="assets/arrow-up.svg" className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
