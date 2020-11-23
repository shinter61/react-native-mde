import React from 'react';
import styled from 'styled-components';
import {View, Text, StyleSheet} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import MarkdownEditor from './MarkdownEditor';

const PreviewContainer = styled.View`
  margin-left: 2.5%;
  margin-right: 2.5%;
`;
const previewStyles = StyleSheet.create({
  width: 100,
  root: {
    fontFamily: 'Hiragino Kaku Gothic ProN',
  },
});

const ForDev = () => {
  const [value, setValue] = React.useState('');
  const handleChange = (text) => {
    console.log(text);
    setValue(text);
  };
  return (
    <View style={{marginTop: 200}}>
      <MarkdownEditor
        text={value}
        setText={handleChange}
        placeholder={'hello, everyone.'}
      />
      <Text
        style={{
          lineHeight: 40,
          fontSize: 24,
          color: '#40e0d0',
          marginLeft: '2.5%',
        }}>
        Preview
      </Text>
      <View style={{backgroundColor: '#fff'}}>
        <PreviewContainer>
          <Markdown style={previewStyles}>{value}</Markdown>
        </PreviewContainer>
      </View>
    </View>
  );
};

export default ForDev;
