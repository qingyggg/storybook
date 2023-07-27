import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { test_markdown } from './test';
import { useRequest } from '../../hooks/useRequest';
import { postArticleCreateApi } from '../../api/article';
import { useRouter } from 'next/router';
import ArticleDialog from '../../components/articleDialog';
import useLocalStorage from '../../hooks/useLocalStorage';

const ArticleCreate: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [ud] = useLocalStorage('userId');
  const [numUd, setNumUd] = useState<number>(0);
  const router = useRouter();
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  useEffect(() => {
    setMarkdown(test_markdown);
  }, []);
  useMemo(() => {
    setNumUd(parseInt(ud));
  }, [ud]);
  const createReq = useRequest(
    postArticleCreateApi({
      UserID: numUd,
      Title,
      Description,
      Content: markdown,
    }),
    () => {
      router.push('/');
    },
  );
  //for develop
  const testCreate = async () => {
    let i = 15;
    while (i > 0) {
      await (
        await createReq
      )();
      i--;
    }
  };
  const create = async () => {
    await (
      await createReq
    )();
  };
  return (
    <div className='flex justify-between'>
      <Box
        sx={{
          width: '50%',
          maxWidth: '50%',
        }}
      >
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
        }}
      >
        <article className='prose lg:prose-xl'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </Box>
      <div className='fixed bottom-10 right-10'>
        <ArticleDialog
          callback={create}
          dialogTitle='create article'
          dialogContent='please enter article title and description'
          dialogButton='create'
          Title={Title}
          Description={Description}
          onTitleChange={(e) => setTitle(e.target.value)}
          onDescriptionChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
};
export default ArticleCreate;
