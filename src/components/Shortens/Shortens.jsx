import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'components/Button';
import {delShortLink, selectLinks} from '../../store/slice/linkSlice';
import {motion, AnimatePresence} from 'framer-motion';
import classes from './Shortens.module.scss';

const Shortens = () => {
    const [copyLink, setCopyLink] = useState(null)
    const links = useSelector(selectLinks)
    const dispatch = useDispatch()

    const copyToClip = (link) => {
        navigator.clipboard.writeText(link)
        .then(() => {
            setCopyLink(link)
        })
    }

    const linkDelete = (linkCode) => {
        dispatch(delShortLink(linkCode))
    }

    if (!links?.length) return null;

    return (
        <section className={classes.Shortens}>
            <div className='container'>
                {links.map(item => (
                    <AnimatePresence key={item.code}>
                        <motion.div
                            className={classes.item}
                            data-active={copyLink === item.full_short_link2}
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: 'auto'}}
                        >
                            <span>{item.original_link}</span>
                            <span>{item.full_short_link2}</span>
                            <Button
                                variant="square"
                                onClick={() => copyToClip(item.full_short_link2)}
                            >
                                {copyLink === item.full_short_link2 ? 'Copied!' : 'Copy'}
                            </Button>
                            <Button
                                variant="square"
                                onClick={() => linkDelete(item.code)}
                            >
                                Delete Link
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>
        </section>
    );
};

export {Shortens};
