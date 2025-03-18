interface GatewayFormProps {
  gatewayName: string;
  gatewayKey: string;
  handleFormInputs: (inputType: string, val: string) => void;
}

export default function GatewayForm({
  gatewayName,
  gatewayKey,
  handleFormInputs,
}: GatewayFormProps) {
  return (
    <div className="gateway-form">
      <label htmlFor="gatewayName">
        <p>Gateway's name</p>
        <input
          type="text"
          id="gatewayName"
          placeholder="Type name"
          value={gatewayName}
          onChange={(e) => handleFormInputs("gatewayName", e.target.value)}
        />
      </label>
      <label htmlFor="gatewayKey">
        <p>Key</p>
        <textarea
          id="gatewayKey"
          placeholder="Type key"
          rows={5}
          value={gatewayKey}
          onChange={(e) => handleFormInputs("gatewayKey", e.target.value)}
        />
      </label>
    </div>
  );
}
