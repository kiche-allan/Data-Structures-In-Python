from _typeshed import Incomplete
from collections.abc import Generator, Iterator
from typing import Any

from influxdb_client import Script, ScriptCreateRequest, ScriptUpdateRequest
from influxdb_client.client._base import _BaseQueryApi
from influxdb_client.client.flux_table import CSVIterator, FluxRecord, TableList

class InvokableScriptsApi(_BaseQueryApi):
    def __init__(self, influxdb_client) -> None: ...
    def create_script(self, create_request: ScriptCreateRequest) -> Script: ...
    def update_script(self, script_id: str, update_request: ScriptUpdateRequest) -> Script: ...
    def delete_script(self, script_id: str) -> None: ...
    def find_scripts(self, **kwargs): ...
    def invoke_script(self, script_id: str, params: dict[Incomplete, Incomplete] | None = None) -> TableList: ...
    def invoke_script_stream(
        self, script_id: str, params: dict[Incomplete, Incomplete] | None = None
    ) -> Generator[FluxRecord, Any, None]: ...
    def invoke_script_data_frame(
        self, script_id: str, params: dict[Incomplete, Incomplete] | None = None, data_frame_index: list[str] | None = None
    ): ...
    def invoke_script_data_frame_stream(
        self, script_id: str, params: dict[Incomplete, Incomplete] | None = None, data_frame_index: list[str] | None = None
    ): ...
    def invoke_script_csv(self, script_id: str, params: dict[Incomplete, Incomplete] | None = None) -> CSVIterator: ...
    def invoke_script_raw(self, script_id: str, params: dict[Incomplete, Incomplete] | None = None) -> Iterator[list[str]]: ...