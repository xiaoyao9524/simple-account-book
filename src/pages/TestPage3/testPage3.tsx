import React from 'react';
import useForm from 'rc-form-hooks';

export default () => {
  const { getFieldDecorator, validateFields, errors, values } = useForm<{
    username: string;
  }>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields()
      .then(console.log)
      .catch(e => console.error(e.message));
  };
  return (
    <form onSubmit={handleSubmit}>
      {getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please input username!' }]
      })(<input type='text' />)}
      <span className={'value'}>{values.username}</span>
      <span className={'error'}>{errors.username?.map(i => i.message).join('、')}</span>
      <button type={'submit'}>submit</button>
    </form>
  );
};