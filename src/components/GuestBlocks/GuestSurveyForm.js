import { useCallback, useState } from "react";
import { GUEST_FORM_SUBMIT_URL } from "./guestLinks";

const initialForm = {
  fullName: "",
  attendance: "",
  companions: "",
  diet: "",
  transfer: "",
  contact: "",
  wishes: "",
};

const ATTENDANCE_LABEL = {
  yes: "Да, буду один / одна",
  plus: "Да, с сопровождающим / семьёй",
  no: "К сожалению, не смогу",
};

const TRANSFER_LABEL = {
  need: "Нужен трансфер — хочу уточнить",
  no: "Доберусь самостоятельно",
  later: "Пока не знаю — напишу в чат",
};

function buildSummary(values) {
  const lines = [
    `Имя: ${values.fullName}`,
    `Присутствие: ${ATTENDANCE_LABEL[values.attendance] || values.attendance}`,
    values.companions.trim() && `Гости / состав: ${values.companions.trim()}`,
    values.diet.trim() && `Питание: ${values.diet.trim()}`,
    `Трансфер: ${TRANSFER_LABEL[values.transfer] || values.transfer}`,
    `Контакт: ${values.contact}`,
    values.wishes.trim() && `Пожелания: ${values.wishes.trim()}`,
  ].filter(Boolean);
  return lines.join("\n");
}

function toFormData(values) {
  const fd = new FormData();
  fd.append("fullName", values.fullName.trim());
  fd.append("attendance", ATTENDANCE_LABEL[values.attendance] || values.attendance);
  fd.append("companions", values.companions.trim());
  fd.append("diet", values.diet.trim());
  fd.append("transfer", TRANSFER_LABEL[values.transfer] || values.transfer);
  fd.append("contact", values.contact.trim());
  fd.append("wishes", values.wishes.trim());
  fd.append("message", buildSummary(values));
  fd.append("_subject", "Анкета гостя с сайта свадьбы");
  return fd;
}

export default function GuestSurveyForm() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  /** "server" | "local" | null */
  const [submittedMode, setSubmittedMode] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setField = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
    setSubmitError("");
  }, []);

  const validate = useCallback(() => {
    const next = {};
    if (!values.fullName.trim()) next.fullName = "Укажите, как к вам обращаться";
    if (!values.attendance) next.attendance = "Выберите вариант";
    if (!values.transfer) next.transfer = "Выберите вариант";
    if (!values.contact.trim()) next.contact = "Нужен телефон или ник в Telegram";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialForm);
    setErrors({});
    setSubmitted(false);
    setSubmittedMode(null);
    setSubmitError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = GUEST_FORM_SUBMIT_URL?.trim();

    if (endpoint) {
      setSubmitting(true);
      setSubmitError("");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: toFormData(values),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || data.errors?.[0]?.message || `Ошибка ${res.status}`);
        }
        setSubmitted(true);
        setSubmittedMode("server");
      } catch (err) {
        setSubmitError(
          err.message ||
            "Не удалось отправить. Попробуйте позже или напишите в чат гостей.",
        );
      } finally {
        setSubmitting(false);
      }
    } else {
      setSubmitted(true);
      setSubmittedMode("local");
    }
  };

  if (submitted) {
    return (
      <div className="guest-form guest-form--done" role="status">
        <p className="guest-form__done-title">Спасибо!</p>
        <p className="guest-form__done-text">
          {submittedMode === "server"
            ? "Мы получили вашу анкету. Если понадобится уточнение — напишем вам."
            : "Анкета заполнена. Чтобы мы получили ответы на почту или в сервис, добавьте URL в guestLinks.js (например Formspree). Пока что ниже — копия ваших ответов: можно скопировать и отправить в чат гостей."}
        </p>
        {submittedMode === "local" ? (
          <pre className="guest-form__summary" tabIndex={0}>
            {buildSummary(values)}
          </pre>
        ) : null}
        <button type="button" className="guest-form__secondary" onClick={reset}>
          Заполнить заново
        </button>
      </div>
    );
  }

  return (
    <form className="guest-form" onSubmit={handleSubmit} noValidate>
      <div className="guest-form__field">
        <label className="guest-form__label" htmlFor="guest-fullName">
          Имя и фамилия <span aria-hidden="true">*</span>
        </label>
        <input
          id="guest-fullName"
          name="fullName"
          className="guest-form__input"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? "guest-fullName-err" : undefined}
        />
        {errors.fullName ? (
          <p id="guest-fullName-err" className="guest-form__error" role="alert">
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <fieldset
        className="guest-form__fieldset"
        aria-describedby={
          errors.attendance ? "guest-attendance-err" : undefined
        }
      >
        <legend className="guest-form__legend">
          Планируете прийти на праздник? <span aria-hidden="true">*</span>
        </legend>
        <div className="guest-form__radios">
          {[
            { v: "yes", label: "Да, буду один / одна" },
            { v: "plus", label: "Да, с сопровождающим / семьёй" },
            { v: "no", label: "К сожалению, не смогу" },
          ].map(({ v, label }) => (
            <label key={v} className="guest-form__radio-label">
              <input
                type="radio"
                name="attendance"
                value={v}
                checked={values.attendance === v}
                onChange={() => setField("attendance", v)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.attendance ? (
          <p id="guest-attendance-err" className="guest-form__error" role="alert">
            {errors.attendance}
          </p>
        ) : null}
      </fieldset>

      <div className="guest-form__field">
        <label className="guest-form__label" htmlFor="guest-companions">
          Кто будет с вами (имена, если придёте не одни)
        </label>
        <textarea
          id="guest-companions"
          name="companions"
          className="guest-form__textarea"
          rows={2}
          value={values.companions}
          onChange={(e) => setField("companions", e.target.value)}
          placeholder="Необязательно"
        />
      </div>

      <div className="guest-form__field">
        <label className="guest-form__label" htmlFor="guest-diet">
          Аллергии и пожелания по меню
        </label>
        <textarea
          id="guest-diet"
          name="diet"
          className="guest-form__textarea"
          rows={2}
          value={values.diet}
          onChange={(e) => setField("diet", e.target.value)}
          placeholder="Например: без орехов, вегетарианское стол…"
        />
      </div>

      <fieldset
        className="guest-form__fieldset"
        aria-describedby={errors.transfer ? "guest-transfer-err" : undefined}
      >
        <legend className="guest-form__legend">
          Нужен ли организованный трансфер? <span aria-hidden="true">*</span>
        </legend>
        <div className="guest-form__radios">
          {[
            { v: "need", label: "Да, хочу уточнить трансфер" },
            { v: "no", label: "Нет, доберусь самостоятельно" },
            { v: "later", label: "Пока не знаю — напишу в чат" },
          ].map(({ v, label }) => (
            <label key={v} className="guest-form__radio-label">
              <input
                type="radio"
                name="transfer"
                value={v}
                checked={values.transfer === v}
                onChange={() => setField("transfer", v)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errors.transfer ? (
          <p id="guest-transfer-err" className="guest-form__error" role="alert">
            {errors.transfer}
          </p>
        ) : null}
      </fieldset>

      <div className="guest-form__field">
        <label className="guest-form__label" htmlFor="guest-contact">
          Телефон или Telegram <span aria-hidden="true">*</span>
        </label>
        <input
          id="guest-contact"
          name="contact"
          className="guest-form__input"
          type="text"
          autoComplete="tel"
          inputMode="text"
          value={values.contact}
          onChange={(e) => setField("contact", e.target.value)}
          placeholder="+7… или @ник"
          aria-invalid={errors.contact ? "true" : "false"}
          aria-describedby={errors.contact ? "guest-contact-err" : undefined}
        />
        {errors.contact ? (
          <p id="guest-contact-err" className="guest-form__error" role="alert">
            {errors.contact}
          </p>
        ) : null}
      </div>

      <div className="guest-form__field">
        <label className="guest-form__label" htmlFor="guest-wishes">
          Тёплое слово или пожелание
        </label>
        <textarea
          id="guest-wishes"
          name="wishes"
          className="guest-form__textarea"
          rows={3}
          value={values.wishes}
          onChange={(e) => setField("wishes", e.target.value)}
          placeholder="По желанию"
        />
      </div>

      {submitError ? (
        <p className="guest-form__error guest-form__error--global" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="guest-form__actions">
        <button
          type="submit"
          className="guest-form__submit"
          disabled={submitting}
        >
          {submitting ? "Отправка…" : "Отправить анкету"}
        </button>
      </div>
    </form>
  );
}
