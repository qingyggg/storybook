import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/user';

const ArticleCreate: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [userInfo] = useRecoilState(userState);
  const { ID } = userInfo;
  return (
    <div className='flex justify-between'>
      <Box
        sx={{
          width: '50%',
          maxWidth: '50%',
        }}>
        <TextField
          id='filled-multiline-static'
          label='Multiline'
          multiline
          rows={60}
          fullWidth
          defaultValue='Default Value'
          variant='filled'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          width: '50%',
          maxWidth: '100%',
        }}>
        {/* <article className='prose lg:prose-xl'>{markdown}</article> */}
      </Box>
    </div>
  );
};
export default ArticleCreate;
