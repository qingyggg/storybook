import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRequest } from '../../hooks/useRequest';
import {
  getArticleDetailApi,
  postArticleCreateApi,
  postArticleEditApi,
} from '@/api/article';
import { useRouter } from 'next/router';
import useStatelessStorage from '../../hooks/useStatelessStorage';
import ArticleDialog from '../../components/articleDialog';
import { idTransform } from '../../util/common';
import useLocalStorage from '../../hooks/useLocalStorage';

const ArticleEdit: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [ud] = useLocalStorage('userId');
  const router = useRouter();
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [numUd, setNumUd] = useState<number>(0);
  const { ad } = router.query;
  const getArticleDetail = useRequest(
    getArticleDetailApi(idTransform(ad)),
    (res) => {
      const data = res;
      setTitle(data!.Title);
      setDescription(data!.Description);
      setMarkdown(data!.Content);
    },
  );
  useMemo(() => {
    setNumUd(numUd);
  }, [ud]);
  useEffect(() => {
    if (idTransform(ad) === 0) {
      return;
    }
    getArticleDetail();
  }, [ad]);
  const editReq = useRequest(
    postArticleEditApi({
      UserID: parseInt(ud),
      Title,
      Description,
      ArticleID: idTransform(ad),
      Content: markdown,
    }),
    () => {
      router.push('/');
    },
  );
  const create = async () => {
    await (
      await editReq
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
export default ArticleEdit;
