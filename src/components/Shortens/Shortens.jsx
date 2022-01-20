import {useSelector} from 'react-redux';
import {Button} from 'components/Button';
import {selectLinks} from '../../store/slice/linkSlice';
import {motion, AnimatePresence} from 'framer-motion';
import {v4 as uuid} from 'uuid';
import classes from './Shortens.module.scss';

const Shortens = () => {

    const links = useSelector(selectLinks)

    if (!links?.length) return null;

    return (
        <section className={classes.Shortens}>
            <div className='container'>
                {links.map(item => (
                    <AnimatePresence key={uuid()}>
                        <motion.div
                            className={classes.item}
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: 'auto'}}
                            transition={{type: 'spring', stiffness: 100}}
                        >
                            <span>{item.original_link}</span>
                            <span>{item.full_short_link2}</span>
                            <Button
                                variant="square"
                            >
                                Copy
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>
        </section>
    );
};

export {Shortens};
