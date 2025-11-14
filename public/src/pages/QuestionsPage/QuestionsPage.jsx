import { useState } from "react";
import { useGetIssuesesQuery, useGetRandomQuestionQuery } from "../../features/dgt/dgtQuestionsApiSlice";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/system";
import { useSetAnswerMutation } from "../../features/dgt/dgtAnswerApiSlice";
import { BASE_URL } from "../../../constants";

const QuestionsPage = () => {
    const [issue, setIssue] = useState("0");
    const [answer, setAnswer] = useState(null);
    const { data: issiusesData } = useGetIssuesesQuery();
    const { data: randomQuestionData } = useGetRandomQuestionQuery(issiusesData?.[parseInt(issue)], {
        skip: !issiusesData,
    });

    const [setAnswerMutation] = useSetAnswerMutation();

    const correctAnswer = randomQuestionData?.answers?.[randomQuestionData?.correctAnswerIndex];
    console.log("Correct Answer:", randomQuestionData);

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Temas</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tema"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                >
                    {issiusesData?.map((issue, i) => (
                        <MenuItem key={issue} value={i}>
                            {issue}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Container>
                <Box mt={4}>
                    <Typography variant="h5">{randomQuestionData?.question}</Typography>
                    {randomQuestionData?.imageSrc && (
                        <Box mt={2} mb={2}>
                            <img
                                src={BASE_URL + randomQuestionData.imageSrc}
                                style={{ maxWidth: "100%" }}
                                onError={(e) => (e.target.style.display = "none")}
                            />
                        </Box>
                    )}
                    {randomQuestionData?.answers.map((value, index) => (
                        <Typography
                            key={index}
                            onClick={() => {
                                if (!answer) setAnswer(value);
                            }}
                            mb={3}
                            p={2}
                            border={1}
                            borderColor="grey.400"
                            fontWeight={600}
                            borderRadius={4}
                            sx={{
                                backgroundColor:
                                    answer === value
                                        ? answer === value && value === correctAnswer
                                            ? "lightgreen"
                                            : "red"
                                        : value === correctAnswer && answer
                                        ? "lightgreen"
                                        : "bisque",
                            }}
                        >
                            {value}
                        </Typography>
                    ))}
                    {answer && (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setAnswerMutation({
                                    questionId: randomQuestionData.id,
                                    answer: answer === correctAnswer,
                                })
                                    .unwrap()
                                    .then(() => {
                                        setAnswer(null);
                                    })
                                    .catch((error) => {
                                        console.error("Failed to submit answer:", error);
                                    });
                            }}
                        >
                            Siguiente Pregunta
                        </Button>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default QuestionsPage;
