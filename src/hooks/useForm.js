import { useState } from 'react';

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault();
    try {
      await onSubmit(values);
      // Reset form after successful submission
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setErrors(error);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset
  };
};

export default useForm; 