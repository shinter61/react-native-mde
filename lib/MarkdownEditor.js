import React from 'react';
import styled from 'styled-components';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonColumn = styled.View`
  display: flex;
  flex-direction: row;
`;
const EditToolButton = styled.TouchableOpacity`
  align-self: flex-start;
  height: 30px;
  width: 30px;
  padding: 0;
  align-items: center;
  justify-content: center;
  margin: 4px;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 24px;
`;

const MarkdownEditor = ({text, setText, placeholder}) => {
  const [selection, setSelection] = React.useState({start: 0, end: 0});
  const changeText = (input) => {
    const {start, end} = selection;
    const isDeletion = text.length > input.length;
    let draft = input;
    if (input.substring(end - 1, end) === '\n' && !isDeletion) {
      const prevLines = input.slice(0, start).split('\n');
      const prevLine = prevLines[prevLines.length - 2];
      const result = prevLine.match(/^[0-9]\./);

      if (result !== null) {
        const nextOrderlist = (Number(result[0]) + 1).toString(10) + '.' + ' ';
        const joinedPrevLines = prevLines.join('\n');
        const prevText =
          joinedPrevLines.slice(-1) === '\n'
            ? joinedPrevLines
            : joinedPrevLines + '\n';
        const nextText = text.substring(end);
        draft = prevText + nextOrderlist + nextText;
      }
    }
    setText(draft);
  };
  const changeSelection = (event) => {
    setSelection(event.nativeEvent.selection);
  };
  const wrapText = (wrapper) => {
    const {start, end} = selection;
    if (start === end) {
      const prevText = text.substring(0, start);
      const nextText = text.substring(end);
      setText(prevText + wrapper + wrapper + nextText);
    } else {
      const prevText = text.substring(0, start);
      const boldText = text.substring(start, end);
      const nextText = text.substring(end);
      setText([prevText, wrapper, boldText, wrapper, nextText].join(''));
    }
  };
  const applyListFormat = (mark, forbiddenApplyPattern) => {
    const {start, end} = selection;
    if (start !== end) {
      return;
    }

    if (text.substring(end - 1, end) === '\n') {
      const prevText = text.substring(0, start);
      const nextText = text.substring(end);
      setText([prevText, `${mark} `, nextText].join(''));
    } else {
      const prevLines = text.slice(0, start).split('\n');
      const currentLine = prevLines.pop();
      if (forbiddenApplyPattern.test(currentLine)) {
        return;
      }

      const nextText = text.substring(end);
      const joinedPrevLines = prevLines.join('\n');
      const prevText =
        joinedPrevLines.slice(-1) === '\n'
          ? joinedPrevLines
          : joinedPrevLines + '\n';
      const headMark = /^[\t\s#]/.test(currentLine) ? mark : `${mark} `;
      setText([prevText, headMark, currentLine, nextText].join(''));
    }
  };
  const insertLinkFormat = () => {
    const {start, end} = selection;
    if (start === end) {
      const prevText = text.substring(0, start);
      const nextText = text.substring(end);
      setText(prevText + '[](https://)' + nextText);
    } else {
      const prevText = text.substring(0, start);
      const linkText = text.substring(start, end);
      const nextText = text.substring(end);
      setText([prevText, '[', linkText, '](https://)', nextText].join(''));
    }
  };
  return (
    <View>
      <ButtonColumn>
        <EditToolButton onPress={() => wrapText('**')}>
          <ButtonText>B</ButtonText>
        </EditToolButton>
        <EditToolButton onPress={() => wrapText('*')}>
          <ButtonText>I</ButtonText>
        </EditToolButton>
        <EditToolButton onPress={() => applyListFormat('#', /^#{6}/)}>
          <ButtonText>H</ButtonText>
        </EditToolButton>
        <EditToolButton onPress={() => applyListFormat('*', /^\*/)}>
          <Icon name="list-ul" size={24} />
        </EditToolButton>
        <EditToolButton onPress={() => applyListFormat('1.', /^[0-9]\./)}>
          <Icon name="list-ol" size={24} />
        </EditToolButton>
        <EditToolButton onPress={() => applyListFormat('>', /^>/)}>
          <Icon name="quote-left" size={24} />
        </EditToolButton>
        <EditToolButton onPress={() => insertLinkFormat()}>
          <Icon name="link" size={24} />
        </EditToolButton>
      </ButtonColumn>
      <TextInput
        style={{
          height: 200,
          padding: 10,
          backgroundColor: 'white',
          marginBottom: 20,
        }}
        multiline={true}
        placeholder={placeholder || "What's on your mind?"}
        onChangeText={changeText}
        onSelectionChange={changeSelection}
        value={text}
      />
    </View>
  );
};

export default MarkdownEditor;
