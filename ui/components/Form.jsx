import React, { Fragment, useState } from "react";
import { Formik, Field } from "formik";

// https://huggingface.co/docs/transformers/main_classes/text_generation#transformers.generation_utils.GenerationMixin.generate
const items = {
  max_new_tokens: number(10, 500, 10, 150),
  do_sample: boolean(true),
  temperature: number(0, 2, 0.05, 1),
  top_k: number(50, 500, 10, 50),
  top_p: number(0, 1, 0.05, 1),
  typical_p: number(0, 1, 0.05, 1),
  num_beam_groups: number(1, 50, 1, 1),
  num_beams: number(1, 50, 1, 1),
  repetition_penalty: number(0.2, 10, 0.2, 1.8),
  length_penalty: number(0, 2, 0.05, 1),
  early_stopping: boolean(false),
};

export function PromptForm({ onSubmit }) {
  const [isAdvanced, setAdvanced] = useState(false);
  return (
    <Formik
      initialValues={{
        input: "",
        ...Object.entries(items).reduce((prev, [key, value]) => {
          prev[key] = value.initial;
          prev["enabled_" + key] = false;
          return prev;
        }, {}),
        enabled_do_sample: true,
        enabled_repetition_penalty: true
      }}
      validate={(values) => {
        const errors = {};
        if (values.input.length === 0) {
          errors.input = "Empty prompt";
        }
        return errors;
      }}
      onSubmit={(obj) => {
        if (!isAdvanced) {
          obj = { input: obj.input };
        } else {
          obj = filter(obj);
        }
        return onSubmit(obj);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        /* and other goodies */
      }) => {
        return (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[repeat(4, fit-content(1ch))] gap-2 auto-rows-min justify-items-stretch overflow-y-auto p-1"
          >
            <textarea
              className="w-full p-1 min-h-[200px] placeholder:italic col-span-4 bg-inherit"
              placeholder="Your prompt here"
              name="input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.input}
            />

            <button
              type="button"
              className="col-span-4 bg-sky-500  p-2 w-full rounded-md"
              onClick={() => setAdvanced(!isAdvanced)}
            >
              Advanced
            </button>

            {isAdvanced &&
              Object.entries(items).map(([name, props]) => {
                const enabledKey = "enabled_" + name;
                const args = { name, value: values[name], disabled: !values[enabledKey] };

                return (
                  <Fragment key={name}>
                    <Field type="checkbox" name={enabledKey} />
                    <label>{name}</label>
                    {props.type === "number" && (
                      <>
                        <Field {...props} {...args} type="range" />
                        <Field
                          // {...props}
                          {...args}
                          type="number"
                          className="px-2  text-black disabled:bg-inherit disabled:text-transparent w-full"
                        />
                      </>
                    )}
                    {props.type === "boolean" && (
                      <>
                        <Field {...args} type="checkbox" checked={values[name]} />
                        <div></div>
                      </>
                    )}
                  </Fragment>
                );
              })}

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="bg-sky-500 hover:bg-sky-700 disabled:bg-inherit p-2 w-full rounded-md col-span-4"
            >
              Submit
            </button>
            {errors.input && touched.input && <div className="text-red-400 col-span-3">{errors.input}</div>}
          </form>
        );
      }}
    </Formik>
  );
}

function number(min = 0, max = 1, step = 0.1, initial = 0) {
  return { type: "number", min, max, step, initial };
}
function boolean(initial = false) {
  return { type: "boolean", initial };
}
function filter(obj) {
  obj = Object.assign({}, obj);
  const enabled = Object.keys(obj).filter((k) => k.startsWith("enabled"));
  enabled.forEach((enabledKey) => {
    const key = enabledKey.replace("enabled_", "");
    const isEnabled = obj[enabledKey];
    if (!isEnabled) {
      delete obj[key];
    }
    delete obj[enabledKey];
  });
  return obj;
}
