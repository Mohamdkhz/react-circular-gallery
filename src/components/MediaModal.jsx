import { useState, useEffect } from "react";

export default function MediaModal({ isOpen, onClose, item, darkMode }) {
  const [currentMedia, setCurrentMedia] = useState(0);

  useEffect(() => {
    setCurrentMedia(0);
  }, [item]);

  if (!isOpen) return null;

  const media = item?.media?.[currentMedia];

  const nextMedia = () => {
    setCurrentMedia((prev) => (prev === item.media.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setCurrentMedia((prev) => (prev === 0 ? item.media.length - 1 : prev - 1));
  };

return (
  <div
    onClick={onClose}
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-sm
      p-3
      md:p-6
    "
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
        relative
        flex
        flex-col
        overflow-hidden

        w-[96vw]
        h-[92vh]

        sm:w-[92vw]
        sm:h-[88vh]

        lg:w-[82vw]
        lg:h-[84vh]

        rounded-3xl
        shadow-2xl

        ${darkMode ? "bg-slate-900" : "bg-white"}
      `}
    >
      {/* دکمه بستن */}

      <button
        onClick={onClose}
        className={`
          absolute
          top-5
          right-5
          z-30

          flex
          h-10
          w-10
          text-lg
            md:text-2xl
          items-center
          justify-center

          rounded-full

          ${
            darkMode
              ? "bg-black/30 text-white"
              : "bg-white/40 text-slate-900"
          }

          backdrop-blur
          hover:bg-cyan-500
          hover:text-white
          transition
          cursor-pointer
        `}
      >
        ✕
      </button>

      {/* بخش عکس یا ویدیو */}

      <div
        className="
          relative
          h-[80%]
          w-full
          bg-black
          overflow-hidden
        "
      >
        {media?.type === "image" && (
          <img
            src={media.src}
            alt={item.title}
            className="
              h-full
              w-full
              object-cover
            "
          />
        )}

        {media?.type === "video" && (
          <video
            src={media.src}
            controls
            className="
              h-full
              w-full
              object-cover
            "
          />
        )}

        {/* فلش چپ */}

        <button
          onClick={prevMedia}
          className={`
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            flex
            items-center
            justify-center

            h-11
            w-11
                text-lg
            md:text-2xl
            md:h-14
            md:w-14

            rounded-full

            ${
              darkMode
                ? "bg-black/40"
                : "bg-white/40"
            }

            text-white
            backdrop-blur
            hover:bg-cyan-500
            transition
            cursor-pointer
          `}
        >
          ❮
        </button>

        {/* فلش راست */}

        <button
          onClick={nextMedia}
          className={`
            absolute
            right-4
            top-1/2
            -translate-y-1/2

            flex
            items-center
            justify-center

            h-11
            w-11
            text-lg
            md:text-2xl
            md:h-14
            md:w-14

            rounded-full

            ${
              darkMode
                ? "bg-black/40"
                : "bg-white/40"
            }

            text-white
            backdrop-blur
            hover:bg-cyan-500
            transition
            cursor-pointer
          `}
        >
          ❯
        </button>
        
      </div>

      {/* پایین مودال */}

      <div
        className={`
          h-[20%]

          flex
          flex-col
          justify-center

          px-6
          md:px-10

          ${
            darkMode
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-900"
          }
        `}
      >
                {/* نقطه‌ها */}

        <div className="mt-1 flex justify-center gap-3">
          {item?.media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMedia(index)}
              className={`
                h-1.5
                w-1.5
                md:h-2.5
                md:w-2.5
                rounded-full
                transition-all

                ${
                  currentMedia === index
                    ? "bg-cyan-400 scale-125"
                    : "bg-slate-500 hover:bg-cyan-300"
                }
              `}
            />
          ))}
        </div>
        <h2 dir="rtl" className="text-2xl md:text-3xl font-bold text-cyan-400 ">
          {item.title}
        </h2>
         
        <p
        dir="rtl"
          className={`
            mt-3
            text-sm
            md:text-base
            

            ${
              darkMode
                ? "text-slate-300"
                : "text-slate-600"
            }
          `}
        >
          {item.description}
        </p>


      </div>
    </div>
  </div>
);
}
