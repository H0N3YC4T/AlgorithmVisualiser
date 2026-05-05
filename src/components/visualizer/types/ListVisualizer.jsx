import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { classCategory } from '../../../styles/class-category';

export default function ListVisualizer({ items = [], activeIndex = -1, title = "" }) {
  return (
    <div className={classCategory.vizContainer}>
      <div className="w-full flex flex-col items-center justify-center p-8 min-h-[300px]">
      {title && (
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">{title}</div>
      )}
      
      <div className="flex flex-wrap gap-4 justify-center items-end">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              layout
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              className={`relative w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-xl font-mono font-black shadow-lg transition-colors ${
                index === activeIndex 
                  ? 'bg-indigo-500 border-indigo-400 text-white shadow-indigo-500/20' 
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {item.value || item}
              <div className="absolute -top-6 text-[10px] font-bold text-slate-600 font-sans">
                {index}
              </div>
              {index === 0 && (
                <div className="absolute -bottom-6 text-[8px] font-black text-indigo-400 uppercase tracking-widest">
                  Front / Top
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {items.length === 0 && (
          <div className="text-slate-500 italic text-sm">Structure is empty</div>
        )}
      </div>
      </div>
    </div>
  );
}

ListVisualizer.propTypes = {
  items: PropTypes.array,
  activeIndex: PropTypes.number,
  title: PropTypes.string
};
