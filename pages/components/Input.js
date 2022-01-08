import React from 'react';
import TextField from '@mui/material/TextField';
import { ErrorMessage, useField } from 'formik';

const Input = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <div className='mb-2'>
      <TextField
        {...field} {...props}
        margin='normal'
        name={field.name}
        label={label}
        fullWidth
        autoComplete='off'
      />
      <ErrorMessage component='div' name={field.name} className='error' />
    </div>
  )
}

export default Input;
