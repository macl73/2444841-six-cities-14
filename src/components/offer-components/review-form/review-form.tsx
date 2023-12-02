import { ChangeEvent, useCallback, useState } from 'react';
import { ConstantValues } from '../../../const.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks/index.tsx';
import { postComment } from '../../../store/api-actions.ts';
import { TReviewProps } from '../../../types/index.ts';
import MemoRating from '../rating/rating.tsx';
import { getLoadingReviewForm, getReviewFormError } from '../../../store/reviews/selectors.ts';
import { toast } from 'react-toastify';
import { undoError } from '../../../store/reviews/reviews.ts';
import Spinner from '../../spinner/spinner.tsx';

export default function ReviewForm({id}: TReviewProps): JSX.Element {

  const [rating, setRating] = useState<number> (0);
  const [comment, setComment] = useState<string>('');
  const hasError = useAppSelector(getReviewFormError);
  const isLoading = useAppSelector(getLoadingReviewForm);
  const dispatch = useAppDispatch();

  function handleChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  const handleRating = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  }, []);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(postComment({id, comment, rating}));
    setComment('');
    setRating(0);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    toast.warn('Somthing went wrong, please, try again');
    setTimeout(() => dispatch(undoError()), 2000);
    return <Spinner />;
  }

  const isValid = comment.length > ConstantValues.MinCommentLength && comment.length < ConstantValues.MaxCommentLength && rating !== 0 && !isLoading && !hasError;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <MemoRating starsCount={handleRating} />
      <textarea onChange={handleChange} value={comment} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ConstantValues.MinCommentLength} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
}
