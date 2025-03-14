export default function GatewayForm() {
  return (
    <div className="gateway-form">
      <label htmlFor="gatewayName">
        <p>Gateway's name</p>
        <input type="text" id="gatewayName" placeholder="Type name" />
      </label>
      <label htmlFor="gatewayKey">
        <p>Key</p>
        <textarea id="gatewayKey" placeholder="Type key" rows={5} />
      </label>
    </div>
  );
}
