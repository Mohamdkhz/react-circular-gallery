import { useState } from "react";
import { motion } from "framer-motion";
import items from "../data/items";
import MediaModal from "../components/MediaModal";

export default function Home() {
  const radius =
    window.innerWidth < 640 ? 110 : window.innerWidth < 1024 ? 150 : 180;
  const total = items.length;
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={`
    relative
    flex
    flex-col
    h-screen
    items-center
    justify-center
    transition-colors
    duration-500
    ${darkMode ? "bg-slate-950" : "bg-slate-100"}
  `}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute
    top-6
    right-6
    h-12
    w-12
    rounded-full
    
    ${darkMode ? "bg-cyan-500" : "bg-slate-800"}
    text-xl
    shadow-lg
    transition
    hover:scale-110
    cursor-pointer
    
    `}
    
  
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1 className="tracking-wide font-semibold font  pt-8 text-lg  sm:text-xl md:text-2xl text-center ">
        <span
          className={`  text-center     ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          نگارخانه‌ی
        </span>
        <span> </span>
        <span className="text-cyan-500 font-semibold">ساعت‌گرد</span>
        <p
          className={`  text-xs text-center pt-2     ${darkMode ? "text-gray-300" : "text-slate-900"}`}
        >
          {" "}
          روی دایره‌ی مرکزی نگه دارید یا آن را لمس/کلیک کنید
        </p>
      </h1>

      <div className="flex flex-1 items-center justify-center">
        <div
          onMouseLeave={() => {
            if (!isPinned) {
              setIsOpen(false);
            }
          }}
          className="  w-90 h-100    md:w-100 md:h-100 lg:w-120 lg:h-120  "
        >
          {items.map((item, index) => {
            const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
            return (
              <motion.div
                key={index}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false); // منوی دایره‌ای جمع شود
                  setIsPinned(false); // حالت پین هم برداشته شود

                  setTimeout(() => {
                    setIsModalOpen(true); // بعد از 700 میلی‌ثانیه مودال باز شود
                  }, 700);
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: isOpen ? Math.cos(angle) * radius : 0,

                  y: isOpen ? Math.sin(angle) * radius : 0,

                  scale: isOpen ? 1 : 0,

                  opacity: isOpen ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,

                  delay: isOpen ? index * 0.08 : (total - index - 1) * 0.06,

                  type: "spring",

                  stiffness: 140,

                  damping: 15,
                }}
                whileHover={{
                  scale: 1.18,

                  zIndex: 100,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  },
                }}
                className={` absolute
      flex
      h-12
      w-12
      text-[8px]

      sm:h-14
      sm:w-14

        md:h-16
        md:w-16
        md:text-[10px]
      items-center
      justify-center
       left-1/2
       top-1/2
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-cyan-500
      text-[10px]
      text-white
      z-10
      cursor-pointer
      
      `}
              >
                {item.title}
              </motion.div>
            );
          })}

          <button
            onMouseEnter={() => setIsOpen(true)}
            onClick={() => {
              setIsPinned(!isPinned);
              setIsOpen(!isOpen);
            }}
            className={`    group
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    flex
    h-20
    w-20
    sm:h-28
    sm:w-28
    md:h-32
    md:w-32
    items-center
    justify-center
    rounded-full
    ${darkMode ? "bg-cyan-500 text-slate-900" : "bg-cyan-700 text-white"}
    text-xl
    sm:text-2xl
    font-bold
    text-slate-900
    transition-all
    duration-400
    hover:scale-110
    hover:shadow-[0_0_35px_10px_rgba(34,211,238,0.65)]
    z-20
    cursor-pointer`}
          >
            منو
            <span
              className="
      absolute
      inset-[-12px]
      rounded-full
      border
      border-cyan-400/40
      transition-all
      duration-400
      ease-[cubic-bezier(0.34,1.8,0.64,1)]
      group-hover:scale-110
      group-hover:border-cyan-300
      
      
    "
            />
            <span
              className="
      absolute
      inset-[-24px]
      rounded-full
      border
      border-cyan-400/10
      transition-all
      duration-600
      ease-[cubic-bezier(0.34,1.8,0.64,1)]
      group-hover:scale-110
      group-hover:border-cyan-300/80
      
    "
            />
          </button>
        </div>
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        darkMode={darkMode}
      />
    </main>
  );
}
