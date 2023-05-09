import { Box, TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/user';
import remarkGfm from "remark-gfm";
import {test_markdown} from "./test";

const ArticleCreate: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [userInfo] = useRecoilState(userState);
  const { ID } = userInfo;
    useEffect(()=>{
        setMarkdown(test_markdown)
    },[])
    return (
    <div className='flex justify-between'>
      <Box
        sx={{
          width: '50%',
          maxWidth: '50%',
        }}>
        <TextField
          id='filled-multiline-static'
          label='write your story in markdown form'
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
         <article className='prose lg:prose-xl'>
             <ReactMarkdown  remarkPlugins={[remarkGfm]} >{markdown}</ReactMarkdown>
         </article>
      </Box>
    </div>
  );
};
export default ArticleCreate;
