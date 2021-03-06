import {useForm} from 'react-hook-form';
import {Button} from 'components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {createShortLink, selectLoading} from '../../store/slice/linkSlice';

import classes from './Form.module.scss';

const Form = () => {
    const loading = useSelector(selectLoading)
    const dispatch = useDispatch()

    const urlValid = /(http(s)?:\/\/.).?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
    } = useForm({mode: 'onSubmit'})

    const onSubmit = ({Url}) => {
        dispatch(createShortLink(Url))
        reset();
    }

    return (
        <section className={classes.section}>
            <div className="container">
                <form
                    className={classes.form}
                    autoComplete='off'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        type="text"
                        placeholder="Shorten a link here..."
                        className={classes.input}
                        {...register('Url', {
                            required: 'Please add a link',
                            pattern: {
                                value: urlValid,
                                message: 'Please enter a valid url',
                            },
                        })}
                        style={{
                            outlineColor: errors.Url ? 'var(--secondary-300)' : 'currentColor',
                            outlineWidth: errors.Url ? '3px' : 'inherit'
                        }}
                        disabled={loading === 'loading'}
                    />
                    <Button
                        variant="square"
                        type="submit"
                        size="medium"
                        disabled={loading === 'loading'}
                    >{loading === 'loading' ? 'Loading...' : 'Shorten it!'}</Button>
                    {errors.Url && (
                        <div className={classes.error}>
                            {errors.Url.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    )
}

export {Form};
