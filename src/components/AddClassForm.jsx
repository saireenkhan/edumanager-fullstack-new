import React, { useState } from 'react';

const AddClassForm = ({ fields, buttonText, onSubmit }) => {
  const allowedInputTypes = ['text', 'number', 'email', 'password', 'date', 'tel', 'url'];
  const [values, setValues] = useState(() => {
    const initial = {};
    const extract = (fieldList) => {
      fieldList.forEach((field) => {
        if (field.type === 'row' && Array.isArray(field.fields)) {
          extract(field.fields);
        } else if (field.type === 'select' && Array.isArray(field.options)) {
          initial[field.name] = field.options[0];
        } else if (field.type === 'checkbox') {
          initial[field.name] = false;
        }
      });
    };
    extract(fields);
    return initial;
  });

  function handleChange(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      {Array.isArray(fields) && fields.map((element, index) => {
        if (element.type === 'row' && Array.isArray(element.fields)) {
          const rowStyles = element.gridTemplate
            ? { gridTemplateColumns: element.gridTemplate }
            : {};

          return (
            <div className="form-row" style={rowStyles} key={`row-${index}`}>
              {element.fields.map((subField, subIndex) => {
                const targetType = allowedInputTypes.includes(subField.type) ? subField.type : 'text';
                return (
                  <div className="form-group" key={`sub-${subIndex}`}>
                    <label>
                      {subField.required && <span className="required-star"></span>}
                      {subField.label}
                    </label>

                    {subField.type === 'select' && Array.isArray(subField.options) ? (
                      <select
                        value={values[subField.name] || ''}
                        onChange={(e) => handleChange(subField.name, e.target.value)}
                      >
                        {subField.options.map((opt, oIdx) => (
                          <option key={`opt-${oIdx}`} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : subField.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={values[subField.name] || false}
                        onChange={(e) => handleChange(subField.name, e.target.checked)}
                      />
                    ) : (
                      <input
                        type={targetType}
                        placeholder={subField.placeholder}
                        value={values[subField.name] || ''}
                        onChange={(e) => handleChange(subField.name, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        }

        const fieldType = allowedInputTypes.includes(element.type) ? element.type : 'text';
        return (
          <div
            className="form-group"
            style={element.marginTop ? { marginTop: element.marginTop } : {}}
            key={`field-${index}`}
          >
            <label>
              {element.required && <span className="required-star"></span>}
              {element.label}
            </label>

            {element.type === 'textarea' ? (
              <textarea
                rows={element.rows || 3}
                placeholder={element.placeholder}
                value={values[element.name] || ''}
                onChange={(e) => handleChange(element.name, e.target.value)}
              ></textarea>
            ) : element.type === 'select' && Array.isArray(element.options) ? (
              <select
                value={values[element.name] || ''}
                onChange={(e) => handleChange(element.name, e.target.value)}
              >
                {element.options.map((opt, oIdx) => (
                  <option key={`opt-single-${oIdx}`} value={opt}>{opt}</option>
                ))}
              </select>
            ) : element.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={values[element.name] || false}
                onChange={(e) => handleChange(element.name, e.target.checked)}
              />
            ) : (
              <input
                type={fieldType}
                placeholder={element.placeholder}
                value={values[element.name] || ''}
                onChange={(e) => handleChange(element.name, e.target.value)}
              />
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="btn-add"
        style={{ width: '100%', justifyContent: 'center', marginTop: '2rem' }}
      >
        {buttonText}
      </button>
      
    </form>
  );
};

export default AddClassForm;