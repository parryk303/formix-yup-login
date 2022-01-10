import React from 'react';
import TextField from '@mui/material/TextField';
import { ErrorMessage, useField } from 'formik';

const Input = ({ label, name, ...props }) => {
  const [field] = useField(name);
  return (
    <div className='mb-2'>
      <TextField
        {...field} {...props}
        margin='normal'
        name={name}
        label={label}
        fullWidth
        autoComplete='off'
      />
      <ErrorMessage component='div' name={name} className='error' />
    </div>
  )
}

export default Input;
