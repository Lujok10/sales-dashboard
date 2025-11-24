import { useState, useEffect } from "react";
import api from "../api";

export default function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const tenantId = localStorage.getItem("tenantId") || window.location.search.split("tenant=")[1];
    if (!tenantId) return;

    api.get(`/tenant-config?tenantId=${tenantId}`)
      .then(res => setTenant(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!tenant) return <div className="text-center mt-5">Loading tenant info...</div>;

  return children({ tenant });
}
