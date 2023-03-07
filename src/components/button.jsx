import { Button, Spinner } from "react-bootstrap";

function Btn({ model, isLoading, modelType }) {
  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-800 flex items-center gap-2"
      onClick={() => model(modelType)}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Processing
        </>
      ) : (
        `Process ${modelType}`
      )}
    </Button>
  );
}

export default Btn;
