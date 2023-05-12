export class CreateExamQuestionDto {
  examCategory_id: string;
  syllabusStr: string;
  syllabusSubStr: string;
  question: string;
  options: string;
  correct_ans: string;
  explaination: string;
}
